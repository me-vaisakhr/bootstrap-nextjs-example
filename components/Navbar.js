import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import css from "@/style/navbar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
function TopNav() {
  const { pathname } = useRouter();
  return (
    <Navbar className={css["navbar-container"]} fixed="top">
      <Navbar.Brand href="#home">Navbar</Navbar.Brand>
      <Nav className="ml-auto mr-auto">
        <Link href="/" passHref>
          <Nav.Link active={pathname === "/"}>Home</Nav.Link>
        </Link>
        <Link href="/about" passHref>
          <Nav.Link active={pathname === "/about"}>About</Nav.Link>
        </Link>

        <Link href="/restaurants" passHref>
          <Nav.Link active={pathname.includes("/restaurants")}>
            Restaurants
          </Nav.Link>
        </Link>

        <Link href="/blog" passHref>
          <Nav.Link active={pathname === "/blog"}>Blog</Nav.Link>
        </Link>

        <Link href="/contact" passHref>
          <Nav.Link active={pathname === "/contact"}>Contact</Nav.Link>
        </Link>
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-info">Search</Button>
      </Form>
    </Navbar>
  );
}

export default TopNav;
