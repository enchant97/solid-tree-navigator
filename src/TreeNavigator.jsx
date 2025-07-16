/*
  Copyright 2025 Leo Spratt.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
 */
import { For, Show, createSignal } from "solid-js";
import { A, useLocation } from "@solidjs/router";
import { Dynamic } from "solid-js/web";

/**
 * @typedef {Object} Node
 * @property {string} title
 * @property {string} href
 * @property {Node[]} [nodes]
 */

/**
 * @typedef {Object} IconProps
 * @property {import("solid-js").Accessor<boolean>} active
 * @property {import("solid-js").Accessor<boolean>} expand

/**
 * @param {IconProps} props
 */
function FileIcon({ active }) {
    return (
        <span
            class="tn-tree-node-icon"
            classList={{ "tn-active": active() }}
        >Fi</span>
    )
}

/**
 * @param {IconProps} props
 */
function FolderIcon({ active }) {
    return (
        <span
            class="tn-tree-node-icon"
            classList={{ "tn-active": active() }}
        >Fo</span>
    )
}

/**
 * @param {Object} props
 * @param {import("solid-js").Component<IconProps>} props.fileIcon
 * @param {import("solid-js").Component<IconProps>} props.folderIcon
 * @param {string} props.title
 * @param {string} props.href
 * @param {Node[]} [props.nodes]
 * @param {number[]} props.indexes
 */
function TreeNode({ fileIcon, folderIcon, title, href, nodes, indexes }) {
    const location = useLocation();
    const showActive = () => location.pathname.startsWith(href)
    const [expand, setExpand] = createSignal(showActive())
    return (
        <li role="none" aria-expanded={expand()}>
            <A
                activeClass="tn-active"
                inactiveClass="tn-inactive"
                end={true}
                class="tn-tree-node"
                role="treeitem"
                href={href}
            >
                <Show
                    when={nodes !== undefined}
                    fallback={(
                        <Dynamic component={fileIcon} active={showActive} expand={expand} />
                    )}
                >
                    <button
                        class="tn-tree-node-expand-btn"
                        classList={{ "tn-active": showActive() }}
                        onClick={(ev) => {
                            ev.preventDefault()
                            if (nodes !== undefined) {
                                setExpand(!expand());
                            }
                        }}
                    ><Dynamic component={folderIcon} active={showActive} expand={expand} /></button>
                </Show>
                <span
                    class="tn-tree-node-label"
                    onClick={() => {
                        if (nodes !== undefined) {
                            setExpand(true)
                        }
                    }}
                >{title}</span>
            </A>
            <Show when={nodes !== undefined && expand()}>
                <ul class="tn-tree-nodes" role="group">
                    <For each={nodes}>
                        {(node, i) => (
                            <TreeNode
                                fileIcon={fileIcon}
                                folderIcon={folderIcon}
                                indexes={[...indexes, i()]}
                                {...node}
                            />
                        )}
                    </For>
                </ul>
            </Show>
        </li >
    )
}

/**
 * The file tree component.
 * @param {Object} props
 * @param {import("solid-js").Accessor<Node[]>} props.nodes - The file tree nodes
 * @param {import("solid-js").Component<IconProps>} [props.fileIcon] - Customise the file icon
 * @param {import("solid-js").Component<IconProps>} [props.folderIcon] - Customise the folder icon
 */
function TreeNavigator(props) {
    return (
        <ul class="tn-tree" role="tree">
            <For each={props.nodes()}>
                {(node, i) => (
                    <TreeNode
                        fileIcon={props.fileIcon || FileIcon}
                        folderIcon={props.folderIcon || FolderIcon}
                        indexes={[i()]}
                        {...node}
                    />
                )}
            </For>
        </ul>
    )
}

export default TreeNavigator
