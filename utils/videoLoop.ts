/**
 * Find the primary video element on the YouTube page.
 */
export const findVideoElement = (): HTMLVideoElement | null => {
  return (
    document.querySelector<HTMLVideoElement>("#movie_player video, ytd-player video") ??
    document.querySelector<HTMLVideoElement>("video")
  );
};

/**
 * Toggle the loop property on a video element.
 * Returns the new loop state.
 */
export const toggleVideoLoop = (video: HTMLVideoElement): boolean => {
  video.loop = !video.loop;
  return video.loop;
};
