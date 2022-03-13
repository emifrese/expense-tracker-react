import "./ExpenseDate.css";

function ExpenseDate(props) {
  const months = ["January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December" ];
  // const month = props.date.toLocaleString("en-US", { month: "long" });
  const month = months[props.month];
  // const day = props.date.toLocaleString("en-US", { day: "2-digit" });
  const day = props.day;
  // const year = props.date.getFullYear();
  const year = props.year;

  return (
    <div className="expense-date">
      <div className="expense-date__month">{month}</div>
      <div className="expense-date__year">{year}</div>
      <div className="expense-date__day">{day}</div>
    </div>
  );
}

export default ExpenseDate;
