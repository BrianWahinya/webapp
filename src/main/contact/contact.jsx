import { Breadcrumbs, FaIcon } from "../../components";
import "./contacts.css";

export default function Contact() {
  return (
    <>
      <Breadcrumbs crumbs={["home", "contact"]} />
      <div className="contactsDiv">
        <h5>Contacts</h5>
        <div className="contactDetails">
          <p className="pTitles">
            <FaIcon name="whatsapp" /> Whatsapp
          </p>
          <p className="pDetails">+254701062151</p>
          <p className="pTitles">
            <FaIcon name="email" /> Email
          </p>
          <p className="pDetails">brianwahinyangure@gmail.com</p>
          <p className="pTitles">
            <FaIcon name="mailbox" /> Mailbox
          </p>
          <p className="pDetails">140-20319 South Kinangop, Kenya</p>
        </div>
      </div>
    </>
  );
}
