import React, { useState, useEffect } from 'react';
import { Logo } from "../components/Logo";
import { Footer } from "../components/Footer";
import axios from 'axios';

export function Contributors() {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await axios.get(
          'https://api.github.com/repos/jll38/njitbytes/contributors'
        );
        setContributors(response.data);
      } catch (error) {
        console.error('Error fetching contributors:', error.message);
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
  const columns = 4;

  // Split contributors into rows with the specified number of columns
  const contributorsRows = chunkArray(contributors, columns);

  return (
    <div className="contributor-container">
      <div className="h-screen w-full flex flex-col justify-center items-center">
        <Logo includeChip={false} />
        <div className="mt-8"> {/* Add margin to separate logo and image */}
          <img src="/images/github_contributors.png" alt="GitHub Contributors" className="max-w-full h-auto" />
        </div>

        {/* Display contributors in a dynamically growing table */}
        <table className="contributors-table"> {/* Add margin to separate image and table */}
          <tbody>
            {contributorsRows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((contributor) => (
                  <td
                  style={{
                    padding: '15px',
                    textAlign: 'center',
                    transition: 'transform 0.3s ease-in-out',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1) rotateX(10deg)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1) rotateX(0deg)';
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <a
                      href={contributor.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none' }}
                    >
                      <img
                        src={contributor.avatar_url}
                        alt={`${contributor.login}'s avatar`}
                        style={{
                          borderRadius: '50%',
                          width: '120px',
                          height: '120px',
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                          transition: 'transform 0.3s ease-in-out',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      />
                    </a>
                    <div style={{ marginTop: '10px' }}>
                      <a
                        href={contributor.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                          color: '#333',
                          textDecoration: 'none',
                          fontSize: '16px',
                        }}
                      >
                        {contributor.login}
                      </a>
                    </div>
                  </div>
                </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Footer />
    </div>
  );
}
