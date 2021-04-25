import { FunctionComponent } from 'react';
import { useWatch } from 'react-hook-form';
import { Control } from 'react-hook-form';

import '../../styles/components/conditional-button.css'

interface ConditionalButtonProps {
  control: Control;
  forceDisable?: boolean;
}

const ConditionalButton: FunctionComponent<ConditionalButtonProps> = ({ control, children, forceDisable }) => {
  const watchFields = useWatch({ control, defaultValue: [''] });
  const isDisabled = forceDisable || Object.values(watchFields).some(value => !value);

  return (<button className="conditional-button" disabled={isDisabled}>{children}</button>);
};

export default ConditionalButton;
