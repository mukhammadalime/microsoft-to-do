import { _365Apps } from "../../data/micorost-apps";

const MainApps = ({ onOpenAllApps }: { onOpenAllApps: () => void }) => {
  return (
    <div className="_365Apps__main">
      <h2>Apps</h2>
      <div className="_365Apps__table">
        {_365Apps.slice(0, 12).map((app) => (
          <a href={app.link} className="appContainer" key={app.name}>
            <img
              src={`./assets/images/365Apps/microsoft-${app.imgLocation}`}
              alt=""
            />
            <span>{app.name}</span>
          </a>
        ))}
      </div>

      <div className="_365Apps__bottom" onClick={onOpenAllApps}>
        <div>
          <span>All apps</span>
          <img src="./assets/icons/arrow-right.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default MainApps;
