// popup.js
document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('dismissed-videos');
    const clearBtn = document.querySelector('.clear-all');
    
    const updateList = async () => {
      const stored = await chrome.storage.local.get('dismissedVideos');
      const dismissedVideos = stored.dismissedVideos || [];
      
      container.innerHTML = dismissedVideos.map(video => `
        <div class="video-item">
          <img class="thumbnail" src="${video.thumbnail}" alt="${video.title}">
          <div class="video-info">
            <h3 class="title">${video.title}</h3>
            <p class="channel">${video.channel}</p>
            <p class="timestamp">Dismissed: ${new Date(video.timestamp).toLocaleString()}</p>
          </div>
        </div>
      `).join('');
    };
    
    clearBtn.addEventListener('click', async () => {
      await chrome.storage.local.set({ dismissedVideos: [] });
      updateList();
    });
    
    updateList();
  });