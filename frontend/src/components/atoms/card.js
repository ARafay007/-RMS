import './card.css';

export const Card = ({children, cardProps={}}) => {
  return (
    <div className="card" {...cardProps}>
      {children}
    </div>
  );
}