// import React, { useState, useEffect } from 'react';
// import './Home.css'; // Import a CSS file for easier media queries

// const Home = () => {
//   const [videos, setVideos] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchVideos();
//   }, []);

//   const fetchVideos = async () => {
//     try {
//       const response = await fetch('https://i71090qh4e.execute-api.us-east-1.amazonaws.com/dev');
//       const data = await response.json();

//       // Parse the JSON in the 'body' field
//       const parsedBody = JSON.parse(data.body);
//       if (response.ok) {
//         setVideos(Array.isArray(parsedBody) ? parsedBody : []);
//       } else {
//         setError(parsedBody.body || 'Error fetching videos');
//       }
//     } catch (err) {
//       setError('Failed to fetch videos');
//     }
//   };

//   return (
//     <div>
//       <h2 style={styles.header}>Hot Videos</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <div className="gridContainer">
//         {videos.map((video, index) => (
//           <div key={index} className="gridItem">
//             <video
//               controls
//               width="100%"
//               src={video.videoUrl}
//               poster={video.thumbnailUrl}
//               style={styles.videoPlayer}
//             >
//               Your browser does not support the video tag.
//             </video>
//             <h3 style={styles.title}>{video.title || 'Untitled Video'}</h3>
//             <p style={styles.description}>{video.description || 'No description available.'}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   header: {
//     textAlign: 'center',
//     fontSize: '2em',
//     fontWeight: 'bold',
//     margin: '20px 0',
//     color: '#333',
//   },
//   videoPlayer: {
//     width: '100%',
//     borderRadius: '4px',
//     marginBottom: '10px',
//   },
//   title: {
//     fontSize: '1.2em',
//     fontWeight: 'bold',
//     color: '#222',
//     margin: '10px 0 5px',
//   },
//   description: {
//     fontSize: '0.9em',
//     color: '#666',
//     margin: '0',
//   },
// };

// export default Home;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch(
        "https://wtju434tql.execute-api.us-east-1.amazonaws.com/dev1"
      );
      const data = await response.json();

      // Parse the JSON in the 'body' field
      const parsedBody = JSON.parse(data.body);
      if (response.ok) {
        setVideos(Array.isArray(parsedBody) ? parsedBody : []);
      } else {
        setError(parsedBody.body || "Error fetching videos");
      }
    } catch (err) {
      setError("Failed to fetch videos");
    }
  };

  const handleVideoClick = (videoId) => {
    // Navigate to the VideoDetail page with the videoId as a URL parameter
    navigate(`/video/${videoId}`);
  };

  return (
    <div>
      <h2 style={styles.header}>All Videos</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="gridContainer">
        {videos.map((video, index) => (
          <div
            key={index}
            className="gridItem"
            onClick={() => handleVideoClick(video.videoId)}
          >
            <video
              //   controls
              width="100%"
              src={video.videoUrl}
              poster={video.thumbnailUrl}
              style={styles.videoPlayer}
            >
              Your browser does not support the video tag.
            </video>
            <h3 style={styles.title}>{video.title}</h3>
            <p style={styles.description}>{video.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  header: {
    textAlign: "center",
    fontSize: "2em",
    fontWeight: "bold",
    margin: "20px 0",
    color: "#333",
  },
  videoPlayer: {
    width: "100%",
    borderRadius: "4px",
    marginBottom: "10px",
  },
  title: {
    fontSize: "1.2em",
    fontWeight: "bold",
    color: "#222",
    margin: "10px 0 5px",
  },
  description: {
    fontSize: "0.9em",
    color: "#666",
    margin: "0",
  },
};

export default Home;
