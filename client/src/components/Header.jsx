import React, { useContext, useEffect } from "react";
import { Link as RouteLink } from "react-router-dom";
import { UserContext } from "../UserContext";
import { GiCoolSpices } from "react-icons/gi";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem
} from "@nextui-org/react";

function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const backendUrl = import.meta.env.VITE_SERVER || "http://localhost:7777";
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // If user is logged in, then define username
  if (userInfo) {
    var username = userInfo.username;
  }
  // Clear token on logout
  async function logout() {
    await fetch(backendUrl + "/logout", {
      credentials: "include",
    });
    setUserInfo(false);
    window.location = "/";
  }
  // Get user data
  useEffect(() => {
    try {
      // Fetch cookie if user is logged in (checks if userinfo is null)
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

      // handle error if any
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
            <GiCoolSpices />
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
              <NavbarItem>
                <Button color="primary" variant="flat">
                  <RouteLink to={"/create"}> Create</RouteLink>
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
        
          <NavbarMenuItem >
            <Link onClick={logout} className="cursor-pointer">
            Logout
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem >
            <Link href="/create">
            Create
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem >
            <Link href="https://github.com/realsnipc/blog">
            Source
            </Link>
          </NavbarMenuItem>
      </NavbarMenu>
      </Navbar>
    </>
  );
}

export default Header;
