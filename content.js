const addDismissButtons = () => {
    const videos = document.querySelectorAll('ytd-rich-grid-media');
    
    videos.forEach(video => {
      // Only add button if it doesn't exist
      if (!video.querySelector('.quick-dismiss-btn')) {
        const dismissBtn = document.createElement('button');
        dismissBtn.className = 'quick-dismiss-btn';
        dismissBtn.innerHTML = '×';
        
        dismissBtn.addEventListener('click', async (e) => {
          e.stopPropagation();
          
          // Store video info before removing
          const videoTitle = video.querySelector('#video-title').textContent;
          const channelName = video.querySelector('#channel-name').textContent;
          const thumbnail = video.querySelector('img').src;
          const videoUrl = video.querySelector('a#video-title-link').href;
          
          const dismissedVideo = {
            title: videoTitle,
            channel: channelName,
            thumbnail: thumbnail,
            url: videoUrl,
            timestamp: new Date().toISOString()
          };
          
          // Store in chrome.storage
          const stored = await chrome.storage.local.get('dismissedVideos');
          const dismissedVideos = stored.dismissedVideos || [];
          dismissedVideos.unshift(dismissedVideo);
          await chrome.storage.local.set({ 
            dismissedVideos: dismissedVideos.slice(0, 100) // Keep last 100
          });
          
          // Remove the video from view
          video.style.animation = 'fadeOut 0.3s';
          setTimeout(() => {
            video.remove();
          }, 300);
        });
        
        video.appendChild(dismissBtn);
      }
    });
  };
  
  // Run on page load and DOM changes
  addDismissButtons();
  const observer = new MutationObserver(addDismissButtons);
  observer.observe(document.body, { 
    childList: true,
    subtree: true
  });
  