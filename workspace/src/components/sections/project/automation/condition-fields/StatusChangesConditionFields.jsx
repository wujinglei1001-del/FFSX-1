import { STATUS_OPTIONS } from '../common/constants';
import FromToSelectConditionFields from './FromToSelectConditionFields';

const StatusChangesConditionFields = ({ index }) => (
  <FromToSelectConditionFields index={index} options={STATUS_OPTIONS} />
);

export default StatusChangesConditionFields;
