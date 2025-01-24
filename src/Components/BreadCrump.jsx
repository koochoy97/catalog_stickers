import { Link } from "react-router";
export function BreadCrump(props) {
  return (
    <div className="breadcrumbs text-sm">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link className="product_item" to={`/category/${props.category}`}>
            <a>{props.category}</a>
          </Link>
        </li>

        <li>{props.name}</li>
      </ul>
    </div>
  );
}
