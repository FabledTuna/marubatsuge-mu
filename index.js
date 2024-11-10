// 各マーク
const CIRCLE = "●";
const CROSS = "×";

// 各マス目のIDを二次元配列にする
const ID_LIST = [
  ["s1", "s2", "s3"],
  ["s4", "s5", "s6"],
  ["s7", "s8", "s9"],
];

// ターン数
let turn = 1;

// ゲームが実行中のフラグ
let isRun = true;

// 指定のidを取得する関数
function $(id) {
  return document.getElementById(id);
}

// どちらのターンか判別する関数
function isCircle() {
  return turn % 2 === 1;
}

// ターン表示を切り替える関数
function changeNowPlayer() {
  if (isCircle()) $("tool_nowPlayer").innerHTML = CIRCLE + "のターン";
  else $("tool_nowPlayer").innerHTML = CROSS + "のターン";
}

// 3つのマス目が同じマークかどうか判定する関数
function isComplete(firstId, secondId, thirdId) {
  // 3つのマス目にマークが入っていなければ、この関数の処理は終了(return)する
  if (
    $(firstId).value === "" ||
    $(secondId).value === "" ||
    $(thirdId).value === ""
  )
    return;
  // 3つのマス目のマークが同じマークなら、trueをかえす
  if (
    $(firstId).value === $(secondId).value &&
    $(secondId).value === $(thirdId).value
  )
    return true;
  // 同じマークでなければfalseを返す
  return false;
}

// どこかに揃っている列があるか調べる関数
function completeMark() {
  // 勝利パターンの配列
  const winPatterns = [
    // 横のパターン
    [ID_LIST[0][0], ID_LIST[0][1], ID_LIST[0][2]],
    [ID_LIST[1][0], ID_LIST[1][1], ID_LIST[1][2]],
    [ID_LIST[2][0], ID_LIST[2][1], ID_LIST[2][2]],
    // 縦のパターン
    [ID_LIST[0][0], ID_LIST[1][0], ID_LIST[2][0]],
    [ID_LIST[0][1], ID_LIST[1][1], ID_LIST[2][1]],
    [ID_LIST[0][2], ID_LIST[1][2], ID_LIST[2][2]],
    // 斜めのパターン
    [ID_LIST[0][0], ID_LIST[1][1], ID_LIST[2][2]],
    [ID_LIST[0][2], ID_LIST[1][1], ID_LIST[2][0]]
  ];

  // 各勝利パターンをチェックするループ
  for (let pattern of winPatterns) {
    if ($(pattern[0]).value !== "" && 
        $(pattern[0]).value === $(pattern[1]).value && 
        $(pattern[1]).value === $(pattern[2]).value) {
      winLossResults($(pattern[0]).value + "の勝利！");
      return true;
    }
  }

  // 引き分けの判定
  if (turn >= 9) {
    winLossResults("引き分け！");
    return true;
  }

  return false;
}

// クリックされたマス目を取得してマークを入力する関数
function clickToCheck(e) {
  // ゲームが実行中でなければ終了
  if (!isRun) return;

  // イベント（e）からクリックされたマス目のIDを取得
  let id = e.target.id;

  // 取得したIDから、クリックされたマス目をDOMオブジェクトとして取得
  let object = $(id);

  // すでにマークが入っている場合は、この処理を終了
  if (object.value !== "") return;

  // そのマス目（inputタグ）のvalue属性を変更する
  if (isCircle()) object.value = CIRCLE;
  else object.value = CROSS;

  // 3マスが揃ったかどうか判定する
  if (completeMark()) return;

  // ターン数を1増やす
  turn++;

  // ターン表示を切り替える
  changeNowPlayer();
}

// 勝敗結果を表示する
function winLossResults(message) {
  // ゲームは実行中でない
  isRun = false;

  $("tool_resultText").innerHTML = message;

  // ターン表示を削除する
  $("tool_nowPlayer").style.display = "none";

  // 勝敗表示を表示
  $("tool_resultText").style.display = "block";
}

// リセットボタンの動きを設定する関数
function resetAction() {
  // ターンを1にする
  turn = 1;

  // ターン表示を切り替える
  changeNowPlayer();

  // マスのマークを消す（valueを空にする）
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      $(ID_LIST[i][j]).value = "";
    }
  }

  // 結果表示を消す（空文字にする）
  winLossResults("");

  // ターン表示を復活させる
  $("tool_nowPlayer").style.display = "block";

  // 勝敗表示を削除
  $("tool_resultText").style.display = "none";

  // ゲームを実行中のフラグにする
  isRun = true;
}

// 画面がロードされたときに実行される関数
function onloadAction() {
  // 各マス目に、クリックイベントを設定
  // 繰り返し処理で記述する

  /*
  $("s1").onclick = clickToCheck;
  $("s2").onclick = clickToCheck;
  $("s3").onclick = clickToCheck;
  $("s4").onclick = clickToCheck;
  $("s5").onclick = clickToCheck;
  $("s6").onclick = clickToCheck;
  $("s7").onclick = clickToCheck;
  $("s8").onclick = clickToCheck;
  $("s9").onclick = clickToCheck;
  */

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      $(ID_LIST[i][j]).onclick = clickToCheck;
    }
  }

  // リセットボタンをクリックしたときにイベントを設定
  $("reset").onclick = resetAction;

  // リセットアクションを実行
  resetAction();
}

// 画面が完全に読み込まれたらonloadActionを実行
window.onload = onloadAction;