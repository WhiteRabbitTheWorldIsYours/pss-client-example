import { Medium, WhiteRabbitClient } from "@whiterabbitjs/client";
import { utils } from "@whiterabbitjs/client";
const client = new WhiteRabbitClient({ host: process.env.WR_WALLET_HOST });

const config = {
  partnerStreamSite: "0x17eEF75604716f8D45D4d3a2D32FdC9C7Ea5De05",
  medium: Medium.EST,
};

const movies = [
  {
    id: "tt5247022",
    url:
      "https://wr-trailers.s3.eu-central-1.amazonaws.com/Paterson_Official_Trailer_1_2016_-_Adam_Driver_Movie.mp4",
  },
  {
    id: "tt2933474",
    url:
      "https://wr-trailers.s3.eu-central-1.amazonaws.com/Superfast_Official_Trailer_1_2015_-_Fast_and_Furious_Spoof_HD.mp4",
  },
  {
    id: "tt2133196",
    url:
      "https://wr-trailers.s3.eu-central-1.amazonaws.com/Born_To_Be_Blue_Official_Trailer.mp4",
  },
  {
    id: "tt2125480",
    url:
      "https://wr-trailers.s3.eu-central-1.amazonaws.com/Dancing_In_Jaffa_Official_Trailer.mp4",
  },
  {
    id: "tt2446600",
    url:
      "https://wr-trailers.s3.eu-central-1.amazonaws.com/Next_Goal_Wins_Official_Trailer.mp4",
  },
  {
    id: "tt1654523",
    url:
      "https://wr-trailers.s3.eu-central-1.amazonaws.com/Night_Train_To_Lisbon_Official_Trailer.mp4",
  },
  {
    id: "tt3662066",
    url:
      "https://wr-trailers.s3.eu-central-1.amazonaws.com/One_More_Time_Official_Trailer.mp4",
  },
  {
    id: "tt2032557",
    url:
      "https://wr-trailers.s3.eu-central-1.amazonaws.com/The_Reluctant_Fundamentalist_Official_Trailer.mp4",
  },
];

const getMovieData = async (id: string) =>
  fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=b1854cc7cd8f2e29da75a04a3c946e44`)
    .then(resp => resp.json());

new Vue({
  el: "#app",
  data: {
    videos: [],
    iframe: false,
    popup: {
      on: false,
      video: {},
    },
  },
  mounted: async function () {
    await this.loadMovies();
  },
  methods: {
    getPopup: function (videoData) {
      if (this.popup.on) return;
      this.popup.video = videoData;
      this.popup.on = true;

      const video = this.getVideo();
      video.src = videoData.video;
      video.play();
      const maybePauseAndInitPayment = () => {
        this.checkPayment(this.popup.video.tokenId);
      };
      let playingHandle;
      video.onplaying = () => {
        playingHandle = setTimeout(maybePauseAndInitPayment, 7000);
      };

      video.onpause = () => clearTimeout(playingHandle);
    },
    getVideo() {
      return document.getElementById("player");
    },
    removePopup: function () {
      if (this.iframe) return;
      this.popup.on = false;
      this.popup.paymentRequested = false;
      this.getVideo().pause();
    },
    checkPayment: async function (tokenId) {
      if (!this.popup.on || this.popup.paymentRequested) return;
      const video = this.getVideo();
      video.pause();

      this.iframe = true;
      client.requestPayment(tokenId, config.partnerStreamSite, config.medium).then(() => {
        this.iframe = false;
        this.popup.paymentRequested = true;
        video.play();
      });
    },
    loadMovies: async function () {
      try {
        this.videos = await Promise.all(
          movies.map(async function (movie) {
            const movieDetails = await getMovieData(movie.id);
            return {
              ...movieDetails,
              video: movie.url,
              posterUrl: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`,
              tokenId: utils.imdbToToken(movie.id),
            };
          })
        );
      } catch (e) {
        console.error(e);
      }
    },
  },
});
