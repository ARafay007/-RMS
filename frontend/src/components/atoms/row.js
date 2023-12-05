import './row.css';

export const Row = ({children, rowProps={}}) => (
  <div className="row" {...rowProps}>{children}</div>
);