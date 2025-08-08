import { useSelector } from "react-redux";
function Home() {
  const token = useSelector((store) => store.user.token);
  return <div>HOME {token}</div>;
}

export default Home;
