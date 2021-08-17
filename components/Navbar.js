import React from "react";
import Link from "next/link";
import styled from "styled-components";

const NavbarWrapper = styled.div`
  display: block;
  margin: 0 auto;
  text-align: left;
`;

const Text = styled.li`
  display: inline-block;
  color: #7aabbd;
  list-style: none;
  font-size: 1em;
  margin: 0.5em;
  padding: 0.25em 1em;
  border: 2px solid #7aabbd;
  border-radius: 3px;
`;

const Navbar = () => {
  return (
    <NavbarWrapper>
      <ul>
        <Text>
          <Link href="/">Home</Link>
        </Text>
        <Text>
          <Link href="/login">Login / Register</Link>
        </Text>
      </ul>
    </NavbarWrapper>
  );
};

export default Navbar;
