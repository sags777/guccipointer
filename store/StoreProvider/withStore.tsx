import React from 'react';
import { observer } from 'mobx-react-lite';

const withStore = <P extends object>(BaseComponent: React.FunctionComponent<P>): React.FunctionComponent<P> => {
  const ObservedComponent = observer(BaseComponent);
  return ObservedComponent;
};

export default withStore;
