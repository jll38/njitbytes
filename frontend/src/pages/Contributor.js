import React, { useState, useEffect } from "react";
import Form from "../components/questions/Form";
import { Button } from "@mui/joy";
import { Logo } from "../components/Logo";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SettingsIcon from "@mui/icons-material/Settings";
import axios from "axios";
import Layout from "./Layout";

export function Contributors() {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await axios.get(
          "https://api.github.com/repos/jll38/njitbytes/contributors"
        );
        setContributors(response.data);
      } catch (error) {
        console.error("Error fetching contributors:", error.message);
      }
    };

    fetchContributors();
  }, []);

  // Function to split contributors into rows with a specified number of columns
  const chunkArray = (array, columns) => {
    const result = [];
    for (let i = 0; i < array.length; i += columns) {
      result.push(array.slice(i, i + columns));
    }
    return result;
  };

  // Define the number of columns for the table
  const columns = window.innerWidth < 600 ? 2 : 4;

  // Split contributors into rows with the specified number of columns
  const contributorsRows = chunkArray(contributors, columns);

  return (
    <Layout>
      <div
        style={{
          padding: "1%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: "10%",
        }}
      >
        <div style={{ paddingBottom: "2.4rem" }}>
          <Logo includeChip={false} />
          <img
            src="/images/github_contributors.png"
            alt="GitHub Contributors"
            className="max-w-full h-auto"
          />
        </div>
        <div style={{ marginTop: "2%", width: "auto", margin: "0 auto" }}>
          {/* Display contributors in a dynamically growing table */}
          <table className="contributors-table">
            {/* Add margin to separate image and table */}
            <tbody>
              {contributorsRows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {/* Use flex container for responsive layout */}
                  {row.map((contributor) => (
                    <td
                      key={contributor.id}
                      style={{
                        padding: "15px",
                        textAlign: "center",
                        transition: "transform 0.3s ease-in-out",
                        margin: "auto", // Center horizontally
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform =
                          "scale(1.1) rotateX(10deg)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform =
                          "scale(1) rotateX(0deg)";
                      }}
                    >
                      <a
                        href={contributor.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          textDecoration: "none",
                          display: "block",
                          maxWidth: "100%",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <img
                          src={contributor.avatar_url}
                          alt={`${contributor.login}'s avatar`}
                          style={{
                            borderRadius: "50%",
                            height: "125px",
                            boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.1)",
                            transition: "transform 0.3s ease-in-out",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.1)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                          }}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            textTransform: "uppercase",
                            color: "#333",
                            fontSize: "16px",
                            display: "block",
                            overflowWrap: "break-word",
                            marginTop: "0.5rem", // Adjust the margin to control the space between image and text
                          }}
                        >
                          {contributor.login.length > 11
                            ? `${contributor.login.slice(0, 11)}...`
                            : contributor.login}
                        </span>
                      </a>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
