/**
 * TODO: Bring the html el to the DOM and render tweets
 * 
 */

const tweetInput = document.getElementById('tweet-input');
const tweetBtn = document.getElementById('tweet-btn');
const feed = document.getElementById('feed');
import { tweetsData } from "./data.js";

// Event delegation by using one parent event;
document.addEventListener('click', (e) => {
    const likeId = e.target.dataset.like;
    const retweetId = e.target.dataset.retweet;
    if (likeId)
    {
        handleLikesClick(likeId);
    }

    if (retweetId)
    {
        handleRetweetClick(retweetId);
    }
    
});

// Like functions
function handleLikesClick(tweetId)
{
   const targetTweetObj = tweetsData.filter(tweet => tweet.uuid === tweetId)[0];
  if (!targetTweetObj.isLiked)
  {
    targetTweetObj.likes++;
    
  }else{
    targetTweetObj.likes--;
  }
  targetTweetObj.isLiked = !targetTweetObj.isLiked;
  render();

}

// retweet function
function handleRetweetClick(tweetId)
{
    const targetretweetObj = tweetsData.filter(tweet => tweet.uuid === tweetId)[0];
    
    if (!targetretweetObj.isRetweeted)
    {
        targetretweetObj.retweets++
    }else {
        targetretweetObj.retweets--;
    }

    targetretweetObj.isRetweeted = !targetretweetObj.isRetweeted;
    render();

}

// return tweet html
function getTweetHtml()
{
    let tweetHtml = '';
    tweetsData.forEach(tweet => {
        tweetHtml += `
        <div class="tweet">
        <div class="tweet-inner">
            <img src="${tweet.profilePic}" class="profile-pic">
            <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                     <i class="fa-solid fa-heart" data-like="${tweet.uuid}"></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
              <i class="fa-solid fa-retweet" data-retweet="${tweet.uuid}"></i>
                ${tweet.retweets}
                </span>
            </div>   
        </div>            
    </div>
</div>`
    });

    return tweetHtml;
}

// render tweets feeds
function render()
{
    feed.innerHTML = getTweetHtml();
}

render();

/**
 * 
 * 
 */