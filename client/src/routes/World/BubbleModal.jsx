import React, { useEffect } from 'react';
import msg from '../../assets/msg.glb';
import speech from '../../assets/speech.glb';
import { useThree } from '@react-three/fiber';
import { NpcLocation } from '../../utils/constants/constants';
import { useRecoilValue } from 'recoil';
import { npcHoverState } from '../../Atom';
import { useGLTF } from '@react-three/drei';

const BubbleModal = () => {
  const { camera } = useThree();
  const buble = useGLTF(msg);
  const quest = useGLTF(speech);
  const hovered = useRecoilValue(npcHoverState);
  buble.nodes.Scene.rotation.copy(camera.rotation);

  const location1 = NpcLocation[hovered];
  const location2 = [location1[0], location1[1] + 1.2, location1[2]];
  const location3 = [location1[0], location1[1] + 1.65, location1[2]];

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  return (
    <>
      <primitive
        object={buble.nodes.Scene}
        position={
          (!hovered && location1) ||
          (hovered.startsWith('reindeer') && location3) ||
          (!hovered.startsWith('reindeer') && location2)
        }
        rotation={camera.rotation}
        scale={[0.43, 0.43, 0.43]}
      />
    </>
  );
};

useGLTF.preload(msg, speech);

export default BubbleModal;
