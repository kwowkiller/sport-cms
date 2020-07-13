interface Enum {
  label: string;
  value: any;
}

export class Enumable implements Iterable<Enum> {
  * [Symbol.iterator](): Iterator<Enum> {
    for (const item of this.enums) {
      yield item;
    }
  }

  constructor(private enums: Enum[]) {
  }

  getLabel(value: any) {
    if (value === null || typeof value === 'undefined') {
      return '';
    }
    const find = this.enums.find(i => i.value.toString() === value.toString());
    return find ? find.label : '';
  }
}

// 性别
export const SexType = new Enumable([
  {label: '男', value: 0},
  {label: '女', value: 1},
  {label: '未知', value: 2},
]);

// 积分类型
export const PointType = new Enumable([
  {label: '赠送礼物', value: 0},
  {label: '收到礼物', value: 1},
  {label: '购买方案', value: 2},
  {label: '出售方案', value: 3},
  {label: '积分充值', value: 4},
  {label: '任务赠送', value: 5},
  {label: '后台充值', value: 6},
  {label: '后台扣减', value: 7},
]);

// 任务类型
export const TaskType = new Enumable([
  {label: '每日登录', value: 0},
  {label: '评论', value: 1},
  {label: '分享', value: 2},
  {label: '发布帖子', value: 3},
  {label: '观看直播', value: 4},
  {label: '赠送礼物', value: 5},
  {label: '实名认证', value: 6},
  {label: '积分充值', value: 7},
  {label: '创建球吧', value: 8},
  {label: '开启直播', value: 9},
]);

// 意见反馈类型
export const FeedbackType = new Enumable([
  {label: '账号信息', value: 1},
  {label: '充值问题', value: 2},
  {label: '实名认证', value: 3},
  {label: '直播问题', value: 4},
  {label: '球吧问题', value: 5},
  {label: '比分问题', value: 6},
  {label: '资讯问题', value: 7},
]);

// 礼物标签
export const GiftTagType = new Enumable([
  {label: '热门', value: 0},
  {label: '无', value: 1},
  {label: '豪', value: 2},
]);

// 足球比赛状态
export const FootballMatchStatus = new Enumable([
  {label: '比赛异常', value: 0},
  {label: '未开赛', value: 1},
  {label: '上半场', value: 2},
  {label: '中场', value: 3},
  {label: '下半场', value: 4},
  {label: '加时赛', value: 5},
  {label: '加时赛(弃用)', value: 6},
  {label: '点球决战', value: 7},
  {label: '完场', value: 8},
  {label: '推迟', value: 9},
  {label: '中断', value: 10},
  {label: '腰斩', value: 11},
  {label: '取消', value: 12},
  {label: '待定', value: 13},
]);

// 篮球比赛状态
export const BasketballMatchStatus = new Enumable([
  {label: '比赛异常', value: 0},
  {label: '未开赛', value: 1},
  {label: '第一节', value: 2},
  {label: '第一节完', value: 3},
  {label: '第二节', value: 4},
  {label: '第二节完', value: 5},
  {label: '第三节', value: 6},
  {label: '第三节完', value: 7},
  {label: '第四节', value: 8},
  {label: '加时', value: 9},
  {label: '完场', value: 10},
  {label: '中断', value: 11},
  {label: '取消', value: 12},
  {label: '延期', value: 13},
  {label: '腰斩', value: 14},
  {label: '待定', value: 15},
]);
