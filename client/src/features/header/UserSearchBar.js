import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function UserSearchBar() {
  const navigate = useNavigate();
  const ref = useRef(null);

  return (
    <form onSubmit={() => navigate(`/users/${ref.current.value}`)}>
      <div className="ui search">
        <div className="ui icon input">
          <input
            className="prompt"
            type="text"
            placeholder="Search User ID"
            ref={ref}
          />
          <i className="search icon"></i>
        </div>
        <div className="results"></div>
      </div>
    </form>
  );
}

export default UserSearchBar;
