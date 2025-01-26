import { Link } from "react-router";
export function Section_info(props) {
  return (
    <div className="hero bg-[#ECEDE4] mt-10 rounded-lg py-7">
      <div className="hero-content flex-col md:flex-row-reverse md:w-full gap-16">
        <img
          src={props.img}
          className="w-full md:w-[350px] rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-2xl font-semibold ">{props.title}</h1>
          <p className="py-6">{props.description}</p>
          <Link
            to={props.link}
            className="btn bg-black text-white rounded-full px-4"
          >
            {props.cta}
          </Link>
        </div>
      </div>
    </div>
  );
}
