/**
 * TODO: Bring the html el to the DOM and render tweets
 * 
 */

const tweetInput = document.getElementById('tweet-input');
const tweetBtn = document.getElementById('tweet-btn');
const feed = document.getElementById('feed');
import { tweetsData } from "./data.js";

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
                <i class="fa-regular fa-comment-dots"></i>
                ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                     <i class="fa-solid fa-heart"></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
              <i class="fa-solid fa-retweet"></i>
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