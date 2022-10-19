import { Select } from 'antd';
import React, { useState } from 'react';
const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];

const Test: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const filteredOptions = OPTIONS.filter(o => !selectedItems.includes(o));

  return (
    <Select dropdownStyle={{height:100}}
      mode="multiple"
      placeholder="Inserted are removed"
      value={selectedItems}
      onChange={setSelectedItems}   
      style={{ width: '100%' }}
    >
      {filteredOptions.map(item => (
        <Select.Option key={item} id={item} value={item}>
          {item}
        </Select.Option>
      ))}
    </Select>
  );
};

export default Test;