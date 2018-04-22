import React from "react";
import { Link } from "react-router";
import { t } from "c-3po";

const BackToLogin = () => (
  <Link to="/auth/login" className="link block">{t`返回登录`}</Link>
);

export default BackToLogin;
