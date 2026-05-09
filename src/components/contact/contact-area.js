import BoxItems from "./box-items";
import FormArea from "./form-area";
import LocationArea from "./location-area";
import TopBar from "./top-bar";

const ContactArea = () => {
  return (
    <>
      <TopBar
        title="FAISONS CONNAISSANCE"
        subtitle="Vous avez une question ? Parlons-en."
      />
      <BoxItems/>
      <FormArea/>
      <LocationArea/>
    </>
  );
};

export default ContactArea;
