import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import i18n from 'locales/i18n';
import paths from 'routes/paths';
import IconifyIcon from 'components/base/IconifyIcon';
import NumberTextField from 'components/base/NumberTextField';
import StyledTextField from 'components/styled/StyledTextField';
import useAddPayHandlers from './useAddPayHandlers';

const renderEmployeeCell = (params) => {
  return (
    <Stack direction="row" sx={{ gap: 1.5, alignItems: 'center' }}>
      <Avatar src={params.row.employee.avatar} sx={{ width: 24, height: 24 }} />
      <Stack sx={{ gap: 0.5 }}>
        <Link href={paths.memberProfile} sx={{ typography: 'subtitle2', fontWeight: 400 }}>
          {params.row.employee.name}
        </Link>
        <Typography variant="caption" sx={{ lineHeight: 1.5 }}>
          {params.row.employee.wage}
        </Typography>
      </Stack>
    </Stack>
  );
};

const renderHoursCell = (params) => {
  return (
    <Stack sx={{ width: '60%', minWidth: 150 }}>
      <Stack
        direction="row"
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 36,
        }}
      >
        <Typography variant="body2">
          {i18n.t('ui.sections.hrm.payroll.earnings.regular_8d4e4ef3')}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
          {params.row.hours.regular}
          {i18n.t('ui.sections.hrm.payroll.earnings.hrs_a23c4292')}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 36,
        }}
      >
        <Typography variant="body2">
          {i18n.t('ui.sections.hrm.payroll.earnings.overtime_b758d32c')}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
          {params.row.hours.overtime}
          {i18n.t('ui.sections.hrm.payroll.earnings.hrs_a23c4292')}
        </Typography>
      </Stack>
    </Stack>
  );
};

const renderExtraPayCell = (params, apiRef) => {
  const {
    currencyFormat,
    newLabel,
    setNewLabel,
    newAmount,
    setNewAmount,
    isAdding,
    handleAdd,
    handleKeyDown,
  } = useAddPayHandlers(params, 'extraPay', apiRef);

  return (
    <Stack sx={{ width: '70%', minWidth: 230 }}>
      {params.row.extraPay.map((item, index) => (
        <Stack
          key={index}
          direction="row"
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 36,
          }}
        >
          <Typography variant="body2">{item.label}</Typography>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {currencyFormat(item.amount, { maximumFractionDigits: 0 })}
          </Typography>
        </Stack>
      ))}
      {isAdding && (
        <Stack
          direction="row"
          sx={{
            gap: 1,
            pt: 1,
          }}
        >
          <StyledTextField
            size="small"
            select
            fullWidth
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
          >
            <MenuItem value="Bonus">
              {i18n.t('ui.sections.hrm.payroll.earnings.bonus_4d963cfa')}
            </MenuItem>
            <MenuItem value="Commission">
              {i18n.t('ui.sections.hrm.payroll.earnings.commission_4bfc46bc')}
            </MenuItem>
            <MenuItem value="Housing allowance">
              {i18n.t('ui.sections.hrm.payroll.earnings.housing_allowance_518fa332')}
            </MenuItem>
            <MenuItem value="Vehicle allowance">
              {i18n.t('ui.sections.hrm.payroll.earnings.vehicle_allowance_62d3d83c')}
            </MenuItem>
            <MenuItem value="Medical allowance">
              {i18n.t('ui.sections.hrm.payroll.earnings.medical_allowance_1181dc66')}
            </MenuItem>
            <MenuItem value="Overtime">
              {i18n.t('ui.sections.hrm.payroll.earnings.overtime_b758d32c')}
            </MenuItem>
          </StyledTextField>

          <NumberTextField
            size="small"
            placeholder={i18n.t('ui.sections.hrm.payroll.earnings.amount_43dc8532')}
            variant="custom"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </Stack>
      )}
      {!isAdding && (
        <Button
          size="small"
          endIcon={<IconifyIcon icon="material-symbols:keyboard-arrow-down" />}
          sx={{ alignSelf: 'flex-start' }}
          onClick={handleAdd}
        >
          {i18n.t('ui.sections.hrm.payroll.earnings.add_pay_3bd84b8e')}
        </Button>
      )}
    </Stack>
  );
};

const renderDeductionCell = (params, apiRef) => {
  const {
    currencyFormat,
    newLabel,
    setNewLabel,
    newAmount,
    setNewAmount,
    isAdding,
    handleAdd,
    handleKeyDown,
  } = useAddPayHandlers(params, 'deduction', apiRef);

  return (
    <Stack sx={{ width: '70%', minWidth: 230 }}>
      {params.row.deduction.map((item, index) => (
        <Stack
          key={index}
          direction="row"
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 36,
          }}
        >
          <Typography variant="body2">{item.label}</Typography>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {currencyFormat(item.amount, { maximumFractionDigits: 0 })}
          </Typography>
        </Stack>
      ))}
      {isAdding && (
        <Stack
          direction="row"
          sx={{
            gap: 1,
            pt: 1,
          }}
        >
          <StyledTextField
            size="small"
            placeholder={i18n.t('ui.sections.hrm.payroll.earnings.label_74341e3c')}
            value={newLabel}
            autoFocus
            onChange={(e) => setNewLabel(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <NumberTextField
            size="small"
            placeholder={i18n.t('ui.sections.hrm.payroll.earnings.amount_43dc8532')}
            variant="custom"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </Stack>
      )}
      {!isAdding && (
        <Button
          size="small"
          endIcon={<IconifyIcon icon="material-symbols:keyboard-arrow-down" />}
          sx={{ alignSelf: 'flex-start' }}
          onClick={handleAdd}
        >
          {i18n.t('ui.sections.hrm.payroll.earnings.add_pay_3bd84b8e')}
        </Button>
      )}
    </Stack>
  );
};

const renderNetPayTypeCell = (params, apiRef, currencyFormat) => {
  const handleChange = (e) => {
    const newType = e.target.value;

    const rowId = params.row.id;

    apiRef.current?.updateRows([
      {
        id: rowId,
        netPayType: {
          ...params.row.netPayType,
          type: newType,
        },
      },
    ]);
  };
  return (
    <Stack
      sx={{
        gap: 0.75,
        alignItems: 'flex-end',
        width: 1,
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
        {currencyFormat(params.row.netPayType.amount, {
          maximumFractionDigits: 0,
        })}
      </Typography>
      <StyledTextField
        select
        size="small"
        fullWidth
        value={params.row.netPayType.type}
        onChange={handleChange}
        sx={{ maxWidth: 160, textAlign: 'left' }}
      >
        <MenuItem value="Direct Deposit">
          {i18n.t('ui.sections.hrm.payroll.earnings.direct_deposit_744e62e8')}
        </MenuItem>
        <MenuItem value="Cheque">
          {i18n.t('ui.sections.hrm.payroll.earnings.cheque_6c0a1363')}
        </MenuItem>
        <MenuItem value="Cash Payment">
          {i18n.t('ui.sections.hrm.payroll.earnings.cash_payment_ad3228af')}
        </MenuItem>
      </StyledTextField>
    </Stack>
  );
};

export {
  renderDeductionCell,
  renderEmployeeCell,
  renderExtraPayCell,
  renderHoursCell,
  renderNetPayTypeCell,
};
