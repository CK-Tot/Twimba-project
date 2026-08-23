/**
 * TODO: Bring the html el to the DOM and render tweets
 * 
 */

const tweetInput = document.getElementById('tweet-input');
const feed = document.getElementById('feed');
import { tweetsData } from "./data.js";



// Event delegation by using one parent event;
document.addEventListener('click', (e) => {
    const likeId = e.target.dataset.like;
    const retweetId = e.target.dataset.retweet;
    const replyId = e.target.dataset.reply;
    if (likeId)
    {
        handleLikesClick(likeId);
    }else if (retweetId)
    {
        handleRetweetClick(retweetId);
    }else if (replyId) {
        handleReplyClick(replyId);
    }else if (e.target.id === 'tweet-btn'){
        handleTweetBtnClick();       
    }

   
    
});

// Like functions
function handleLikesClick(tweetId)
{
   const targetTweetObj = tweetsData.filter(tweet => tweet.uuid === tweetId)[0];

    targetTweetObj.isLiked = !targetTweetObj.isLiked;

  if (targetTweetObj.isLiked)
  {
    targetTweetObj.likes++;
    
    
  }else{
    targetTweetObj.likes--;
  }

  
  render();

}

// retweet function
function handleRetweetClick(tweetId)
{
    const targetretweetObj = tweetsData.filter(tweet => tweet.uuid === tweetId)[0];
    
     targetretweetObj.isRetweeted = !targetretweetObj.isRetweeted;

    if (targetretweetObj.isRetweeted)
    {
        targetretweetObj.retweets++;
    }else {
        targetretweetObj.retweets--;
    }

   
    render();

}

// Replay Handle 
function handleReplyClick(replyId)
{
    const replyContainer = document.getElementById(`replies-${replyId}`);
    replyContainer.classList.toggle('hidden');
}

function handleTweetBtnClick()
{
    console.log(tweetInput.value);
    
}

// return tweet html
function getTweetHtml()
{
    
    let tweetHtml = '';
    tweetsData.forEach(tweet => {
        let likeIconClass = '';
        let retweetIconColor = '';

    if (tweet.isLiked)
    {
        likeIconClass = 'liked';
    }

    if (tweet.isRetweeted)
    {
        retweetIconColor = 'retweeted';
    }

    let repliesHtml = '';

    if (tweet.replies.length > 0)
    {
        /**
         * if a tweet has replies, iterate through the replies
         *      
         */

        tweet.replies.forEach(reply => {
            repliesHtml += `
            <div class="tweet-reply">
                <div class="tweet-inner">
                    <img src="${reply.profilePic}" class="profile-pic">
                    <div>
                        <p class="handle">${reply.handle}</p>
                        <p class="tweet-text">${reply.tweetText}</p>
                    </div>
                </div>
            
            </div>
            
            `
        })


    }

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
                     <i class="fa-solid fa-heart ${likeIconClass}" data-like="${tweet.uuid}"></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
              <i class="fa-solid fa-retweet ${retweetIconColor}" data-retweet="${tweet.uuid}"></i>
                ${tweet.retweets}
                </span>
            </div>   
        </div>            
    </div>
    <div class="hidden" id="replies-${tweet.uuid}">
    ${repliesHtml}
    
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