import { weiToEthereum } from "../utils/constants";
import { colors } from "../utils/constants";

function PaymentModal(props) {
  const { show } = props;

  return (
    <dialog>
       <form method="dialog">
    <section>
      <p><label for="favAnimal">Favorite animal:</label>
      <select id="favAnimal">
        <option></option>
        <option>Brine shrimp</option>
        <option>Red panda</option>
        <option>Spider monkey</option>
      </select></p>
    </section>
    <menu>
      <button id="cancel" type="reset">Cancel</button>
      <button type="submit">Confirm</button>
    </menu>
  </form>
    </dialog>
  );
}


export default PaymentModal;

const styles = {

};
