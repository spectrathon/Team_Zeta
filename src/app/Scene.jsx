"use client";
import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/scene.gltf')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="383f7d649c274cb0871eda429a455388fbx" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Arrow" position={[143.983, 278.053, -192.014]} rotation={[-Math.PI / 2, -Math.PI / 9, 0]} scale={4}>
                  <mesh name="Arrow_Arrow_0" geometry={nodes.Arrow_Arrow_0.geometry} material={materials.Arrow} />
                </group>
                <group name="Coins" position={[0.696, 450.676, -142.96]} rotation={[-Math.PI / 2, 0, 0]}>
                  <group name="Coin_07" position={[-91.143, 188.192, -192.289]} rotation={[1.513, 0.634, -1.563]}>
                    <mesh name="Coin_07_Coin_0" geometry={nodes.Coin_07_Coin_0.geometry} material={materials.Coin} />
                  </group>
                  <group name="Coin_06" position={[159.27, -72.142, -142.153]} rotation={[-2.147, 0.153, 3.055]}>
                    <mesh name="Coin_06_Coin_0" geometry={nodes.Coin_06_Coin_0.geometry} material={materials.Coin} />
                  </group>
                  <group name="Coin_05" position={[-12.502, -146.031, -427.099]} rotation={[-2.312, -0.953, 2.718]}>
                    <mesh name="Coin_05_Coin_0" geometry={nodes.Coin_05_Coin_0.geometry} material={materials.Coin} />
                  </group>
                  <group name="Coin_04" position={[200.324, 249.535, -425.153]} rotation={[-0.814, 1.443, 1.153]}>
                    <mesh name="Coin_04_Coin_0" geometry={nodes.Coin_04_Coin_0.geometry} material={materials.Coin} />
                  </group>
                  <group name="Coin_03" position={[-288.654, 215.979, -424.283]} rotation={[-2.174, 0.753, 2.309]}>
                    <mesh name="Coin_03_Coin_0" geometry={nodes.Coin_03_Coin_0.geometry} material={materials.Coin} />
                  </group>
                  <group name="Coin_02" position={[307.853, -210.091, -107.652]} rotation={[-2.053, 0.299, 2.975]}>
                    <mesh name="Coin_02_Coin_0" geometry={nodes.Coin_02_Coin_0.geometry} material={materials.Coin} />
                  </group>
                  <group name="Coin_01" position={[53.483, -225.959, -46.332]} rotation={[-1.116, 1.079, 1.877]}>
                    <mesh name="Coin_01_Coin_0" geometry={nodes.Coin_01_Coin_0.geometry} material={materials.Coin} />
                  </group>
                </group>
                <group name="CoinsGroup" position={[10.91, 4.338, -194.04]}>
                  <mesh name="CoinsGroup_CoinGroup_0" geometry={nodes.CoinsGroup_CoinGroup_0.geometry} material={materials.CoinGroup} />
                  <mesh name="CoinsGroup_CoinGroup_0_1" geometry={nodes.CoinsGroup_CoinGroup_0_1.geometry} material={materials.CoinGroup} />
                  <mesh name="CoinsGroup_CoinGroup_0_2" geometry={nodes.CoinsGroup_CoinGroup_0_2.geometry} material={materials.CoinGroup} />
                </group>
                <group name="Ground" position={[0, 0, -222.736]}>
                  <mesh name="Ground_Ground_0" geometry={nodes.Ground_Ground_0.geometry} material={materials.Ground} />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('./scene.gltf')
