import React, { useState, useEffect } from "react";
import { Container, Tab, Form, Nav, InputGroup } from "react-bootstrap";
import MovieList from "../movies/MovieList";
import { MOVIE_API } from "../../GlobalConstants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassPlus, faVideoCamera } from "@fortawesome/free-solid-svg-icons";
import Home from "../common/Home";

type Props = {
  contextHandler: Function;
};

const Navigation = ({ contextHandler }: Props) => {
  const [key, setKey] = useState<MOVIE_API>("movies-in-theaters");
  const [searchValue, setSearchValue] = useState("");
  const [className, setClassName] = useState("nav flex-column");
  const onSelectedTabChange = (eventKey: any) => {
    setKey(eventKey);
    contextHandler(eventKey);
  };

  const searchMovie = (evnt: any) => {
    const searchVal = evnt.target.value;
    setSearchValue(searchVal);
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 992) {
        setClassName("nav flex-column");
      } else {
        setClassName("nav flex-row");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => { }, []);

  useEffect(() => {
    console.log(searchValue);
  }, [searchValue]);

  return (
    <Container fluid>
      <Tab.Container
        defaultActiveKey="movies-in-theaters"
        onSelect={onSelectedTabChange}
      >
        <Nav variant="pills" className={className} style={{ padding: "0.7vmax" }}>
          <Nav.Item>
            <Nav.Link eventKey="movies-on-the-tip-home" className="navigation-tab">
              <FontAwesomeIcon icon={faVideoCamera} className="me-2" />
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="movies-in-theaters" className="navigation-tab">
              Movies in Theaters
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="movies-coming" className="navigation-tab">
              Coming Soon
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="top-rated-movies" className="navigation-tab">
              Top Rated Movies
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="top-rated-india" className="navigation-tab">
              Top Rated Indian Movies
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="favourit" className="navigation-tab mb-3">
              Favourites
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Form
              className="d-flex"
              style={{ width: "100%", display: "flex", flexWrap: "wrap", marginLeft: "1vmax" }}
            >
              <InputGroup className="mb-3">
                <Form.Control
                  type="search"
                  id="search-box"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchValue}
                  onChange={searchMovie}
                />
                <InputGroup.Text
                  id="search-icon"
                  className="text-white"
                  style={{ backgroundColor: "steelblue", cursor: "pointer" }}
                >
                  <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
                </InputGroup.Text>
              </InputGroup>
            </Form>
          </Nav.Item>
        </Nav>

        <Tab.Content className="">
          {
            <>
              <Tab.Pane eventKey="movies-on-the-tip-home">
                {key === "movies-on-the-tip-home" && (
                  <Home />
                )}
              </Tab.Pane>
              <Tab.Pane eventKey="movies-in-theaters">
                {key === "movies-in-theaters" && (
                  <MovieList showRemove={false} searchValue={searchValue} />
                )}
              </Tab.Pane>
              <Tab.Pane eventKey="movies-coming">
                {key.toString() === "movies-coming" && (
                  <MovieList showRemove={false} searchValue={searchValue} />
                )}
              </Tab.Pane>
              <Tab.Pane eventKey="top-rated-movies">
                {key.toString() === "top-rated-movies" && (
                  <MovieList showRemove={false} searchValue={searchValue} />
                )}
              </Tab.Pane>
              <Tab.Pane eventKey="top-rated-india">
                {key.toString() === "top-rated-india" && (
                  <MovieList showRemove={false} searchValue={searchValue} />
                )}
              </Tab.Pane>
              <Tab.Pane eventKey="favourit">
                {key.toString() === "favourit" && (
                  <MovieList showRemove={true} searchValue={searchValue} />
                )}
              </Tab.Pane>
            </>
          }
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
};

export default Navigation;







