import React, { useEffect } from "react";

import Link from "components/Link/Link";

import "./PageNotFoud.scss";

export const PageNotFoud = () => {
  useEffect(() => {
    document.body.classList.add("is-page-not-found");

    document.getElementById("notFoundPage").addEventListener("mousemove", function (e) {
      var $el = this,
        x = e.clientX / 10,
        y = e.clientY / 10;
      $el.style.backgroundPositionX = x + "px";
      $el.style.backgroundPositionY = y + "px";
    });

    return () => {
      document.body.classList.remove("is-page-not-found");
    };
  }, []);

  return (
    <div className="notfound-page">
      <div className="notfound-page__inner" id="notFoundPage">
        <div className="notfound-page__content">
          <div>
            <h2>404</h2>
          </div>
          <div>
            <h4>Opps ! Page not found</h4>
            <p>
              The page you were looking for doesn't exist. You may have mistyped
              the address or the page may have moved.
            </p>
            <div className="button--container">
              <Link className="btn is--primary" to="/">
                <span>Back To Home</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFoud;
