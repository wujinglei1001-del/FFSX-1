import * as React from 'react';
import { List } from 'react-window';

const ITEM_SIZE = 35;
const MAX_VISIBLE_ITEMS = 8;

const Row = ({ index, style, items }) => <div style={style}>{items[index]}</div>;

const VirtualizedListbox = ({ children, ref, ...other }) => {
  const items = React.Children.toArray(children);
  const itemCount = items.length;

  const height = Math.min(itemCount, MAX_VISIBLE_ITEMS) * ITEM_SIZE;

  return (
    <div ref={ref} {...other}>
      <div style={{ height }}>
        <List
          rowCount={itemCount}
          rowHeight={ITEM_SIZE}
          rowComponent={Row}
          rowProps={{ items }}
          overscanCount={5}
        />
      </div>
    </div>
  );
};

export default VirtualizedListbox;
