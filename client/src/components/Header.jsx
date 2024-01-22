import React, { useContext, useEffect, useState } from "react";
import { Navigate, Link as RouteLink } from "react-router-dom";
import { UserContext } from "../UserContext";
import { PiShootingStarLight } from "react-icons/pi";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";

function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const backendUrl = import.meta.env.VITE_SERVER || "http://localhost:7777";
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Clear token on logout
  async function logout() {
    await fetch(backendUrl + "/logout", {
      credentials: "include",
    });
    setUserInfo(false);
    setRedirect(true);
  }

  // Get user data
  useEffect(() => {
    try {
      if (!userInfo) {
        fetch(backendUrl + "/profile", {
          credentials: "include",
        }).then((res) => {
          res.json().then((userInfo) => {
            if (userInfo == "Login_Error") {
              setUserInfo(null);
            } else {
              setUserInfo(userInfo);
            }
          });
        });
      }
    } catch (error) {
      setUserInfo(null);
    }
  }, []);


  return (
    <>
      <Navbar
        position="sticky"
        className="font-work bg-inherit rounded-large mb-10"
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <RouteLink id="logo" to="/">
            <PiShootingStarLight />
          </RouteLink>
        </NavbarBrand>
        <NavbarContent
          className="hidden sm:flex gap-4"
          justify="center"
        ></NavbarContent>
        <NavbarContent justify="end">
          {userInfo && (
            <>
              <NavbarItem className="hidden lg:flex cursor-pointer">
                <Link onClick={logout}>Logout</Link>
              </NavbarItem>
              <NavbarItem className="hidden lg:flex cursor-pointer">
              <Button color="primary" variant="flat">
              <RouteLink to="/user"> Your Posts</RouteLink>
                </Button>
               
              </NavbarItem>
              <NavbarItem>
                <Button color="primary" variant="flat">
                   <Link href="/create"> Create</Link>
                </Button>
              </NavbarItem>
            </>
          )}
          {/* if userInfo is not available (user is not logged in ) */}
          {!userInfo && (
            <>
              <NavbarItem className="hidden lg:flex cursor-pointer">
                <Link onClick={logout} href="https://github.com/realsnipc/blog">
                  Source
                </Link>
              </NavbarItem>
              <NavbarItem>
                <RouteLink to={"/login"}>
                  <Button color="primary" variant="flat">
                    Login
                  </Button>
                </RouteLink>
              </NavbarItem>
            </>
          )}
        </NavbarContent>
        <NavbarMenu className="font-work pt-10 bg-inherit">
          {userInfo && (
            <>
              <NavbarMenuItem>
                <RouteLink to="/user" className="cursor-pointer">
                  Your Posts
                </RouteLink>
              </NavbarMenuItem>
            </>
          )}
          <NavbarMenuItem>
            <Link onClick={logout} className="cursor-pointer">
              Logout
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link href="/create">Create</Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link href="https://github.com/realsnipc/blog">Source</Link>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    </>
  );
}

export default Header;
