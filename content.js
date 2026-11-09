document.addEventListener(
  'click',
  (event) => {
    const askButton = event.target.closest?.('button[aria-label="Ask"]');
    if (!askButton) {
      return;
    }

    // Default view: let YouTube open the panel, then pick the chip.
    if (!document.querySelector('ytd-watch-flexy[theater]')) {
      clickSummarizeChipWhenReady();
      return;
    }

    const toggleButton = document.querySelector('#movie_player .ytp-size-button');
    if (!toggleButton) {
      return;
    }

    // 1. Toggle theater mode to default view.
    event.preventDefault();
    event.stopPropagation();
    toggleButton.click();

    // 2. Wait 0.1s, then 3. click the Ask button (re-queried in case the
    // DOM was rebuilt). That click re-enters this listener in default view,
    // which handles the chip.
    setTimeout(() => {
      document.querySelector('button[aria-label="Ask"]')?.click();
    }, 100);
  },
  true
);

// 4. Once the Ask panel renders its suggestion chips, click "Summarize the
// video". The panel takes a moment to appear, so poll for it briefly.
function clickSummarizeChipWhenReady(attemptsLeft = 20) {
  const chip = Array.from(document.querySelectorAll('.ytwYouChatChipsDataChip')).find(
    (el) => el.textContent.trim() === 'Summarize the video'
  );
  if (chip) {
    chip.click();
    return;
  }
  if (attemptsLeft > 0) {
    setTimeout(() => clickSummarizeChipWhenReady(attemptsLeft - 1), 150);
  }
}
