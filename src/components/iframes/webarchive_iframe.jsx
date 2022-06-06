import "./webarchive_iframe.css";
export default function WebArchiveIframe({ archive, scroll }) {
  return (
    <>
      <h5 className="archiveName">{archive}-portal</h5>
      <iframe
        className="webarchive"
        scrolling={scroll}
        src={`${window.location.origin}/archives/${archive}`}
      ></iframe>
    </>
  );
}
