// const isVerified = true;

// if (isVerified === true) {
//   console.log("user is good");
// } else {
//   console.log("user is not good");
// }

// console.log(`${isVerified === "" ? "user is good" : "user is not good"}`);

// <img class="w-[20px] h-[20px]" src="https://img.icons8.com/?size=100&id=2sZ0sdlG9kWP&format=png&color=000000" alt="" />

function getTimeString(time) {
  //get hour rest second
  const hour = parseInt(time / 3600);
  let remainingSecond = time % 3600;
  const minute = parseInt(remainingSecond / 60);
  remainingSecond = remainingSecond % 60;
  return `${hour} hour ${minute} minute ${remainingSecond}  second ago`;
}
console.log(getTimeString(7865));
