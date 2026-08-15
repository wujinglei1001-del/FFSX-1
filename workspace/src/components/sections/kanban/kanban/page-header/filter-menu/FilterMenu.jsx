import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button, { buttonClasses } from '@mui/material/Button';
import Menu, { menuClasses } from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { users } from 'data/users';
import i18n from 'locales/i18n';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import IconifyIcon from 'components/base/IconifyIcon';
import SearchTextField from 'components/common/SearchTextField';
import Assignee from './Assignee';
import DueDate from './DueDate';
import Priority from './Priority';
import Status from './Status';

const filterData = {
  assignee: {
    get title() {
      return i18n.t('ui.sections.kanban.kanban.page_header.person_8c41ae88');
    },
    options: [...users.slice(2, 8)].map((user) => ({
      id: user.id,
      isSelected: false,
      label: user.name,
      avatar: user.avatar,
    })),
  },
  dueDate: {
    get title() {
      return i18n.t('ui.sections.kanban.kanban.page_header.due_date_a1b308ec');
    },
    options: [
      {
        id: 1,
        isSelected: false,
        get label() {
          return i18n.t('ui.sections.kanban.kanban.page_header.within_1_week_30194f2f');
        },
      },
      {
        id: 2,
        isSelected: false,
        get label() {
          return i18n.t('ui.sections.kanban.kanban.page_header.within_1_month_b3152698');
        },
      },
      {
        id: 3,
        isSelected: false,
        get label() {
          return i18n.t('ui.sections.kanban.kanban.page_header.within_2_months_37699fa5');
        },
      },
      {
        id: 4,
        isSelected: false,
        get label() {
          return i18n.t('ui.sections.kanban.kanban.page_header.within_6_months_3193ce13');
        },
      },
    ],
  },
  status: {
    get title() {
      return i18n.t('ui.sections.kanban.kanban.page_header.status_bae7d5be');
    },
    options: [
      {
        id: 1,
        isSelected: false,
        get label() {
          return i18n.t('ui.sections.kanban.kanban.page_header.running_73989d9c');
        },
        color: 'primary',
      },
      {
        id: 2,
        isSelected: false,
        get label() {
          return i18n.t('ui.sections.kanban.kanban.page_header.reviewable_dfda3a35');
        },
        color: 'info',
      },
      {
        id: 3,
        isSelected: false,
        get label() {
          return i18n.t('ui.sections.kanban.kanban.page_header.done_e9b450d1');
        },
        color: 'success',
      },
      {
        id: 4,
        isSelected: false,
        get label() {
          return i18n.t('ui.sections.kanban.kanban.page_header.stuck_6c80abf6');
        },
        color: 'error',
      },
      {
        id: 5,
        isSelected: false,
        get label() {
          return i18n.t('ui.sections.kanban.kanban.page_header.cancelled_a1bf92ef');
        },
        color: 'neutral',
      },
    ],
  },
  priority: {
    get title() {
      return i18n.t('ui.sections.kanban.kanban.page_header.priority_886cbff9');
    },
    options: [
      {
        id: 1,
        isSelected: false,
        get label() {
          return i18n.t('ui.sections.kanban.kanban.page_header.normal_45e118d0');
        },
        color: 'primary',
      },
      {
        id: 2,
        isSelected: false,
        get label() {
          return i18n.t('ui.sections.kanban.kanban.page_header.high_b1a5954a');
        },
        color: 'warning',
      },
      {
        id: 3,
        isSelected: false,
        get label() {
          return i18n.t('ui.sections.kanban.kanban.page_header.urgent_ecb26f46');
        },
        color: 'error',
      },
    ],
  },
};

const FilterMenu = () => {
  const { t: translateUi } = useTranslation();
  const [filterItems, setFilterItems] = useState(filterData);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { up } = useBreakpoints();
  const upXl = up('xl');

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = (e) => {
    console.log(e.target.value);
  };

  const handleSelect = (type, item) => {
    setFilterItems((prevItems) => ({ ...prevItems, [type]: item }));
  };

  const handleReset = () => {
    setFilterItems(filterData);
  };

  const handleFilter = () => {
    console.log(filterItems);
    handleClose();
  };

  return (
    <>
      <Tooltip
        title={translateUi('ui.sections.kanban.kanban.page_header.filter_d7decf1a')}
        disableHoverListener={upXl ? true : false}
      >
        <Button
          id="kanban-filter-menu"
          aria-controls={open ? 'kanban-filter-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          variant={upXl ? 'text' : 'soft'}
          size="medium"
          color="neutral"
          shape={upXl ? undefined : 'square'}
          onClick={handleOpen}
          startIcon={
            <IconifyIcon
              icon="material-symbols:filter-alt-outline"
              sx={{ fontSize: '18px !important' }}
            />
          }
          sx={[
            { flexShrink: 0 },
            !upXl && {
              [`& .${buttonClasses.startIcon}`]: {
                m: 0,
              },
            },
          ]}
        >
          {upXl && 'Filter'}
        </Button>
      </Tooltip>
      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'filter-menu',
            sx: { p: 0 },
          },
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        sx={{
          mt: 1.5,
          [`& .${menuClasses.paper}`]: {
            width: 375,
            borderRadius: 6,
            overflow: 'hidden',

            [`& .${menuClasses.list}`]: {
              maxHeight: 500,
              overflow: 'auto',
            },
          },
        }}
      >
        <SearchTextField
          placeholder={translateUi(
            'ui.sections.kanban.kanban.page_header.search_with_a_keyword_1695163b',
          )}
          onChange={handleSearch}
          sx={{ p: 3, width: 1 }}
          iconSx={{ fontSize: 16, color: 'text.secondary' }}
        />

        <Stack sx={{ gap: 3 }}>
          <Assignee assignee={filterItems.assignee} handleSelect={handleSelect} />
          <DueDate dueDate={filterItems.dueDate} handleSelect={handleSelect} />
          <Status status={filterItems.status} handleSelect={handleSelect} />
          <Priority priority={filterItems.priority} handleSelect={handleSelect} />
        </Stack>

        <Stack direction="row" sx={{ p: 3 }}>
          <Button color="neutral" onClick={handleReset}>
            {translateUi('ui.sections.kanban.kanban.page_header.reset_all_a21b0fec')}
          </Button>
          <Button color="neutral" onClick={handleClose} sx={{ ml: 'auto' }}>
            {translateUi('ui.sections.kanban.kanban.page_header.cancel_77dfd213')}
          </Button>
          <Button onClick={handleFilter}>
            {translateUi('ui.sections.kanban.kanban.page_header.confirm_04a21221')}
          </Button>
        </Stack>
      </Menu>
    </>
  );
};

export default FilterMenu;
