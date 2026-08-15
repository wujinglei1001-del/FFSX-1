import { useCallback } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import dayjs from 'dayjs';
import i18n from 'locales/i18n';

export function useAvailabilityConfig(onAddSlot, onUpdateSlot, onRemoveSlot) {
  const { control, watch, setError, clearErrors } = useFormContext();
  const { fields, update } = useFieldArray({
    control,
    name: 'availability',
  });

  const availability = watch('availability');
  const duration = useWatch({ name: 'duration' });

  const generateSlotId = useCallback(
    (dayIndex, slot) => `${dayIndex}-${slot.start}-${slot.end}`,
    [],
  );

  const roundToNextQuarter = useCallback((time) => {
    const minutes = time.minute();
    const remainder = 15 - (minutes % 15);

    return time.add(remainder === 15 ? 0 : remainder, 'minute').second(0);
  }, []);

  const getNextAvailableSlot = useCallback(
    (timeSlots) => {
      const durationHours = parseInt(duration || '1', 10);

      if (!timeSlots.length) {
        const start = dayjs().hour(9).minute(0).second(0);
        const end = start.add(durationHours, 'hour');

        return {
          start: start.format('HH:mm'),
          end: end.format('HH:mm'),
          id: '',
        };
      }

      const lastSlot = timeSlots[timeSlots.length - 1];
      const lastEnd = dayjs(lastSlot.end, 'HH:mm');
      const nextStart = roundToNextQuarter(lastEnd);
      const nextEnd = nextStart.add(durationHours, 'hour');

      if (nextEnd.isAfter(dayjs('23:59', 'HH:mm'))) {
        return { start: '', end: '', id: '' };
      }

      return {
        start: nextStart.format('HH:mm'),
        end: nextEnd.format('HH:mm'),
        id: '',
      };
    },
    [duration, roundToNextQuarter],
  );

  const isOverlapping = useCallback((slots, newSlot, excludeIndex) => {
    const newStart = dayjs(newSlot.start, 'HH:mm');
    const newEnd = dayjs(newSlot.end, 'HH:mm');

    return slots.some((slot, index) => {
      if (index === excludeIndex) return false;
      const start = dayjs(slot.start, 'HH:mm');
      const end = dayjs(slot.end, 'HH:mm');

      return newStart.isBefore(end) && newEnd.isAfter(start);
    });
  }, []);

  const handleTimeChange = useCallback(
    (dayIndex, slotIndex, field, value) => {
      const updatedTimeSlots = [...availability[dayIndex].timeSlots];
      updatedTimeSlots[slotIndex][field] = value;

      const slot = updatedTimeSlots[slotIndex];
      const start = dayjs(slot.start, 'HH:mm');
      const end = dayjs(slot.end, 'HH:mm');

      const fieldPath = `availability.${dayIndex}.timeSlots.${slotIndex}.${field}`;

      if (!start.isBefore(end)) {
        setError(fieldPath, {
          type: 'validate',
          get message() {
            return i18n.t(
              'ui.sections.scheduler.schedulepanel.useavailiabilityconfig.start_time_must_be_before_end_time_2647ba3d',
            );
          },
        });

        return;
      }

      if (isOverlapping(updatedTimeSlots, slot, slotIndex)) {
        setError(fieldPath, {
          type: 'validate',
          get message() {
            return i18n.t(
              'ui.sections.scheduler.schedulepanel.useavailiabilityconfig.this_time_overlaps_with_another_slot_89354368',
            );
          },
        });

        return;
      }

      clearErrors(fieldPath);

      update(dayIndex, {
        ...availability[dayIndex],
        timeSlots: updatedTimeSlots,
      });

      if (onUpdateSlot) {
        onUpdateSlot(dayIndex, slot, slotIndex);
      }
    },
    [availability, clearErrors, isOverlapping, onUpdateSlot, setError, update],
  );

  const handleAddSlot = useCallback(
    (dayIndex) => {
      const currentSlots = availability[dayIndex].timeSlots;
      const newSlot = getNextAvailableSlot(currentSlots);

      if (!newSlot.start || !newSlot.end) return;

      const slotWithId = { ...newSlot, id: generateSlotId(dayIndex, newSlot) };

      update(dayIndex, {
        ...availability[dayIndex],
        timeSlots: [...currentSlots, slotWithId],
      });

      if (onAddSlot) {
        onAddSlot(dayIndex, slotWithId);
      }
    },
    [availability, generateSlotId, getNextAvailableSlot, onAddSlot, update],
  );

  const handleRemoveSlot = useCallback(
    (slotId) => {
      const dayIndex = availability.findIndex((day) =>
        day.timeSlots.some((slot) => slot.id === slotId),
      );

      if (dayIndex === -1) return;

      const dayData = availability[dayIndex];
      const updatedTimeSlots = dayData.timeSlots.filter((slot) => slot.id !== slotId);

      const updatedDay = {
        ...dayData,
        timeSlots: updatedTimeSlots,
        disabled: updatedTimeSlots.length === 0 ? true : dayData.disabled,
      };

      update(dayIndex, updatedDay);

      if (onRemoveSlot) {
        onRemoveSlot(slotId);
      }
    },
    [availability, onRemoveSlot, update],
  );

  const handleToggleDay = useCallback(
    (index) => {
      const dayData = availability[index];
      const isDisabling = !dayData.disabled;

      if (!isDisabling) {
        const newSlot = getNextAvailableSlot([]);
        const slotWithId = { ...newSlot, id: generateSlotId(index, newSlot) };
        const updatedTimeSlots = dayData.timeSlots.length ? dayData.timeSlots : [slotWithId];

        update(index, {
          ...dayData,
          disabled: false,
          timeSlots: updatedTimeSlots,
        });

        if (onAddSlot && !dayData.timeSlots.length) {
          onAddSlot(index, slotWithId);
        }
      } else {
        dayData.timeSlots.forEach((slot) => {
          if (onRemoveSlot) {
            onRemoveSlot(slot.id);
          }
        });

        update(index, {
          ...dayData,
          disabled: true,
          timeSlots: [],
        });
      }
    },
    [availability, getNextAvailableSlot, generateSlotId, onAddSlot, onRemoveSlot, update],
  );

  return {
    availabilityFields: fields,
    availability,
    handleToggleDay,
    handleTimeChange,
    handleAddSlot,
    handleRemoveSlot,
  };
}
