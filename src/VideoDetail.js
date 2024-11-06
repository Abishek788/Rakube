import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const VideoDetail = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [error, setError] = useState(null);
  const [selectedResolution, setSelectedResolution] = useState('1080p');

  useEffect(() => {
    console.log('Component mounted or videoId changed:', videoId);
    fetchVideoDetails(videoId);
  }, [videoId]);

  const fetchVideoDetails = async (videoId) => {
    console.log('Fetching video details for videoId:', videoId);
    try {
      const response = await fetch('https://wtju434tql.execute-api.us-east-1.amazonaws.com/dev1/');
      const data = await response.json();
      console.log('API response:', data);

      const parsedBody = JSON.parse(data.body);
      console.log('Parsed body:', parsedBody);

      const videoData = parsedBody.find((vid) => vid.videoId === videoId);
      console.log('Matched video data:', videoData);

      if (videoData) {
        setVideo(videoData);
        console.log('Video state updated:', videoData);
      } else {
        setError('Video not found');
        console.log('Error: Video not found');
      }
    } catch (err) {
      setError('Failed to fetch video details');
      console.log('Error fetching video details:', err);
    }
  };

  // New function to send the selected videoId and resolution to a new API and update video URL
  const sendResolutionChange = async (videoId, resolution) => {
    console.log('Sending videoId and resolution:', { videoId, resolution });
    try {
      const response = await fetch('https://vgf6ail3u6.execute-api.us-east-1.amazonaws.com/newapi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          videoId,
          resolution,
        }),
      });
      const data = await response.json();
      console.log('Response from resolution change API:', data);
  
      // Parse the body string if it's returned as a JSON string
      const parsedBody = JSON.parse(data.body);
  
      if (parsedBody && parsedBody.videoUrl) {
        // Update video state with new video URL based on resolution
        setVideo((prevVideo) => ({
          ...prevVideo,
          [resolution]: parsedBody.videoUrl,
        }));
        setSelectedResolution(resolution);
        console.log('Video state updated with new resolution URL:', parsedBody.videoUrl);
      } else {
        setError('Failed to get updated video URL');
        console.log('Error: Failed to get updated video URL');
      }
    } catch (err) {
      setError('Failed to send resolution change request');
      console.log('Error sending resolution change request:', err);
    }
  };

  // New function to send video interactions to a third API and log the events
  const sendVideoEvent = async (eventType, details) => {
    const eventPayload = {
      videoId,
      eventType,
      details,
      timestamp: new Date().toISOString(),
    };

    console.log('Sending video event to Kinesis:', eventPayload); // Log the event details being sent

    try {
      await fetch('https://q7mvj83t7j.execute-api.us-east-1.amazonaws.com/dev', { // Replace with your actual endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventPayload),
      });
      console.log('Video event sent successfully');
    } catch (err) {
      console.error('Error sending video event:', err);
    }
  };

  const handleResolutionChange = (resolution) => {
    console.log('Changing resolution to:', resolution);
    sendResolutionChange(videoId, resolution);
    // Send resolution change event
    sendVideoEvent('resolutionChange', { newResolution: resolution });
  };

  const handlePlay = () => {
    console.log('Video play event');
    sendVideoEvent('play', { currentResolution: selectedResolution });
  };

  const handlePause = () => {
    console.log('Video pause event');
    sendVideoEvent('pause', { currentResolution: selectedResolution });
  };

  if (error) {
    console.log('Rendering error message:', error);
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!video) {
    console.log('Video data is null, showing loading message');
    return <p>Loading...</p>;
  }

  // Use selected resolution URL or fallback to default videoUrl
  const videoSrc = video[selectedResolution] || video.videoUrl;
  console.log(`Rendering video with resolution ${selectedResolution} and src ${videoSrc}`);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>{video.title || 'Untitled Video'}</h2>
      <video
        controls
        width="100%"
        src={videoSrc}
        poster={video.thumbnailUrl}
        style={styles.videoPlayer}
        onPlay={handlePlay}
        onPause={handlePause}
      >
        Your browser does not support the video tag.
      </video>
      <p style={styles.description}>{video.description || 'No description available.'}</p>

      <div style={styles.buttonContainer}>
        <button
          style={selectedResolution === '1080p' ? styles.activeButton : styles.button}
          onClick={() => handleResolutionChange('1080p')}
        >
          1080p
        </button>
        <button
          style={selectedResolution === '720p' ? styles.activeButton : styles.button}
          onClick={() => handleResolutionChange('720p')}
        >
          720p
        </button>
        <button
          style={selectedResolution === '360p' ? styles.activeButton : styles.button}
          onClick={() => handleResolutionChange('360p')}
        >
          360p
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
  },
  header: {
    fontSize: '2em',
    fontWeight: 'bold',
    color: '#333',
  },
  videoPlayer: {
    width: '100%',
    borderRadius: '4px',
    marginBottom: '10px',
  },
  description: {
    fontSize: '1em',
    color: '#666',
  },
  buttonContainer: {
    marginTop: '20px',
  },
  button: {
    padding: '10px 20px',
    margin: '0 10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#eceff1',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
  },
  activeButton: {
    padding: '10px 20px',
    margin: '0 10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: 'black',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
  },
};

export default VideoDetail;
