import LotsBox from "../components/LotsBox";

interface UserType {
  userDataArr: string[];
}

const Lots = ({ userDataArr }: UserType) => {
  return (
    <div
      style={{
        display: "flex",
        margin: "0 auto",
        alignItems: "center",
        maxWidth: "860px",
      }}
    >
      <LotsBox />
    </div>
  );
};

export default Lots;
