import { FunctionComponent } from 'react';
import { v4 as uuidv4 } from 'uuid';

import '../../styles/components/error.css';

interface ErrorsProps {
  messages: string[]
}

const Errors: FunctionComponent<ErrorsProps> = ({ messages }) => {
  return (
    <ul className="errors">
      {messages.map(message => (
        <li className="error" key={uuidv4()}>{message}</li>
      ))}
    </ul>
  );
};

export default Errors;
