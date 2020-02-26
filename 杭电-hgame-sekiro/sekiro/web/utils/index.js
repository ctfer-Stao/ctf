function game() {
    this.attacks = [
        {
            "method": "连续砍击",
            "attack": 1000,
            "additionalEffect": "sekiro.posture+=100",
            "solution": "连续格挡"
        },
        {
            "method": "普通攻击",
            "attack": 500,
            "additionalEffect": "sekiro.posture+=50",
            "solution": "格挡"
        },
        {
            "method": "下段攻击",
            "attack": 1000,
            "solution": "跳跃踩头"
        },
        {
            "method": "突刺攻击",
            "attack": 1000,
            "solution": "识破"
        },
        {
            "method": "巴之雷",
            "attack": 1000,
            "solution": "雷反"
        },
    ]
    this.getAttackInfo = function () {
        return this.attacks[Math.floor(Math.random() * this.attacks.length)]
    }
    this.dealWithAttacks = function (sekiro, solution) {
        if (sekiro.attackInfo.solution !== solution) {
            sekiro.health -= sekiro.attackInfo.attack
            if (sekiro.attackInfo.additionalEffect) {
                var fn = Function("sekiro", sekiro.attackInfo.additionalEffect + "\nreturn sekiro")
                sekiro = fn(sekiro)
            }
        }
        sekiro.posture = (sekiro.posture <= 500) ? sekiro.posture : 500
        sekiro.health = (sekiro.health > 0) ? sekiro.health : 0
        if (sekiro.posture == 500 || sekiro.health == 0) {
            sekiro.alive = false
        }
        return sekiro
    }
}
module.exports = game;
