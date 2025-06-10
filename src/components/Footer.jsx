import React from "react";

function Footer() {
  return (
    <footer style={{ textAlign: "center", padding: "1rem", marginTop: "2rem", background: "#eee" }}>
      &copy; {new Date().getFullYear()} Techview TV. All rights reserved.
    </footer>
  );
}

export default Footer;
