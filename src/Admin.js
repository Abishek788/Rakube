// import React, { useState } from "react";
// import "./Admin.css";

// const VideoUpload = () => {
//   const [videoFile, setVideoFile] = useState(null);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [message, setMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);

//   console.log("Rendering VideoUpload component...");

//   // Handle file selection
//   const handleVideoChange = (event) => {
//     console.log("Video file selected:", event.target.files[0]);
//     setVideoFile(event.target.files[0]);
//   };

//   // Convert file to base64
//   const fileToBase64 = (file) => {
//     console.log("Converting file to base64:", file);
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => {
//         console.log("File successfully converted to base64");
//         resolve(reader.result.split(",")[1]);
//       };
//       reader.onerror = (error) => {
//         console.error("Error reading file:", error);
//         reject(error);
//       };
//     });
//   };

//   // Handle form submission
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     console.log("Form submitted.");
//     setIsLoading(true);

//     if (!videoFile || !title || !description) {
//       console.warn("Missing fields. Please fill out all fields.");
//       setMessage("Please fill out all fields and select a video file.");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       console.log("Converting video to base64...");
//       const videoBase64 = await fileToBase64(videoFile);

//       // Create payload to match the Lambda test event structure
//       const data = {
//         title,
//         description,
//         fileName: videoFile.name,
//         fileContent: videoBase64,
//       };
//       const payload = {
//         body: JSON.stringify(data)
//       };

//       console.log("Payload ready to send:", payload);

//       const response = await fetch(
//         "https://25ce0f0pa6.execute-api.us-east-1.amazonaws.com/dev/",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(payload),
//         }
//       );

//       console.log("Awaiting response from server...");
//       const result = await response.json();

//       if (response.ok) {
//         console.log("File uploaded successfully:", result);
//         setMessage("File uploaded successfully.");
//         setShowPopup(true);
//       } else {
//         console.error("Failed to upload file:", result.error);
//         setMessage(result.error || "Failed to upload file.");
//       }
//     } catch (error) {
//       console.error("An error occurred:", error.message);
//       setMessage("An error occurred: " + error.message);
//     } finally {
//       console.log("Setting isLoading to false.");
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="upload-form-container">
//       <h2>Upload Video</h2>
//       <form className="upload-form" onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Title:</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => {
//               console.log("Title changed:", e.target.value);
//               setTitle(e.target.value);
//             }}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Description:</label>
//           <textarea
//             value={description}
//             onChange={(e) => {
//               console.log("Description changed:", e.target.value);
//               setDescription(e.target.value);
//             }}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Video File:</label>
//           <input
//             type="file"
//             accept="video/*"
//             onChange={handleVideoChange}
//             required
//           />
//         </div>
//         <button
//           className={`submit-btn ${isLoading ? "loading" : ""}`}
//           type="submit"
//           disabled={isLoading}
//         >
//           {isLoading ? <span className="spinner"></span> : "Upload"}
//         </button>
//       </form>
//       {message && (
//         <p
//           className={`message ${
//             message.includes("successfully") ? "success" : "error"
//           }`}
//         >
//           {message}
//         </p>
//       )}

//       {showPopup && (
//         <div className="popup-overlay">
//           <div className="popup">
//             <h3>Upload Successful!</h3>
//             <p>Your video has been uploaded successfully.</p>
//             <button
//               onClick={() => {
//                 console.log("Popup closed.");
//                 setShowPopup(false);
//               }}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoUpload;

import React, { useState } from "react";
import "./Admin.css";

const VideoUpload = () => {
  const [videoId, setVideoId] = useState(""); // State for videoId
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  console.log("Rendering VideoUpload component...");

  // Handle file selection
  const handleVideoChange = (event) => {
    console.log("Video file selected:", event.target.files[0]);
    setVideoFile(event.target.files[0]);
  };

  // Convert file to base64
  const fileToBase64 = (file) => {
    console.log("Converting file to base64:", file);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log("File successfully converted to base64");
        resolve(reader.result.split(",")[1]);
      };
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
        reject(error);
      };
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted.");
    setIsLoading(true);

    if (!videoId || !videoFile || !title || !description) {
      console.warn("Missing fields. Please fill out all fields.");
      setMessage("Please fill out all fields and select a video file.");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Converting video to base64...");
      const videoBase64 = await fileToBase64(videoFile);

      // Create payload with user-provided videoId
      const data = {
        videoId,
        title,
        description,
        fileName: videoFile.name,
        fileContent: videoBase64,
      };
      const payload = {
        body: JSON.stringify(data)
      };

      console.log("Payload ready to send:", payload);

      const response = await fetch(
        "https://25ce0f0pa6.execute-api.us-east-1.amazonaws.com/dev",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      console.log("Awaiting response from server...");
      const result = await response.json();

      if (response.ok) {
        console.log("File uploaded successfully:", result);
        setMessage(`File uploaded successfully. Video ID: ${videoId}`);
        setShowPopup(true);
      } else {
        console.error("Failed to upload file:", result.error);
        setMessage(result.error || "Failed to upload file.");
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
      setMessage("An error occurred: " + error.message);
    } finally {
      console.log("Setting isLoading to false.");
      setIsLoading(false);
    }
  };

  return (
    <div className="upload-form-container">
      <h2>Upload Video</h2>
      <form className="upload-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Video ID:</label>
          <input
            type="text"
            value={videoId}
            onChange={(e) => {
              console.log("Video ID changed:", e.target.value);
              setVideoId(e.target.value);
            }}
            required
          />
        </div>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              console.log("Title changed:", e.target.value);
              setTitle(e.target.value);
            }}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => {
              console.log("Description changed:", e.target.value);
              setDescription(e.target.value);
            }}
            required
          />
        </div>
        <div className="form-group">
          <label>Video File:</label>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            required
          />
        </div>
        <button
          className={`submit-btn ${isLoading ? "loading" : ""}`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <span className="spinner"></span> : "Upload"}
        </button>
      </form>
      {message && (
        <p
          className={`message ${
            message.includes("successfully") ? "success" : "error"
          }`}
        >
          {message}
        </p>
      )}

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Upload Successful!</h3>
            <p>Your video has been uploaded successfully.</p>
            <p>Video ID: {videoId}</p>
            <button
              onClick={() => {
                console.log("Popup closed.");
                setShowPopup(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
