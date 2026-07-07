import PlaceholderScreen from "@/components/common/PlaceholderScreen";

export default function NewDiaryPage() {
  return (
    <PlaceholderScreen
      activeValue="diary"
      description={
        "오늘의 감정을 적는 화면을 준비하고 있어요.\n임시 화면으로 이동만 가능하게 연결해두었습니다."
      }
      eyebrow="일기 작성"
      showBackLink
      title="일기 작성하기"
    />
  );
}
