import { useGlobalState } from '../../context/global-context';

export default function Home() {
  const state = useGlobalState();

  return (
    <div>
      <h1>{`Hello ${state.userData.userLogin}`}</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
