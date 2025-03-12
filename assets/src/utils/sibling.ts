import { Node } from "cc";
import { SiblingIndexType } from "../types/type";

// 设置节点以及子节点的图层，从父节点开始
export function setChildrensSiblingIndex(node: Node, siblingIndex: SiblingIndexType) {
    node.setSiblingIndex(siblingIndex);
    node.children.forEach(child => {
        setChildrensSiblingIndex(child, siblingIndex);
    });
}