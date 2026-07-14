export default function NextWeekSection() {
  return (
    <section className="px-6 pt-[31px]">
      <h2 className="text-xl font-medium leading-normal">다음주 흐름</h2>
      <article className="mt-3 min-h-[229px] rounded-lg border border-gray-200 bg-background px-[25px] py-[29px] shadow-[0_4px_20px_rgba(18,18,18,0.05)]">
        <h3 className="text-lg font-medium leading-[22px]">
          조급한 마음은 <span className="text-orange-500">금물!</span> 에너지
          아껴쓰기
        </h3>
        <p className="mt-[15px] whitespace-pre-line text-sm leading-[22px] text-gray-500">
          {
            "이번 주 좋은 흐름이 이어졌던 만큼, 다음 주는 이 에너지를 무리하게 쓰지 않는 게 포인트예요.\n\n木 기운이 활발한 시기엔 자꾸 더 하고 싶어지거든요.\n다음 주는 새로 시작하기보다 이번 주 잘 된 것들을 천천히 다져가는 방향으로 가봐요!"
          }
        </p>
      </article>
    </section>
  );
}
