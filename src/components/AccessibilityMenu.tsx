'use client';

import React from 'react'

import { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { BiUniversalAccess } from "react-icons/bi";
import { BsArrowUpCircle, BsArrowDownCircle } from "react-icons/bs";
import { AiOutlineAlignLeft, AiOutlineAlignCenter, AiOutlineAlignRight } from "react-icons/ai";

import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { RootState } from '@/store/store';
import { toogleHighlightLink } from '@/store/highlight-link/highlightLinkSlice';
import { alignLeft, alignCenter, alignRight } from '@/store/text-alignment/textAlignmentSlice';
import { incrementContrast, decrementContrast } from '@/store/contrast/constrastSlice';
import { incrementFontSize, decrementFontSize } from '@/store/font-size/fontSizeSlice';
import { incrementLineSpacing, decrementLineSpacing } from '@/store/line-spacing/lineSpacingSlice';
import { incrementContentScale, decrementContentScale } from '@/store/content-scale/contentScaleSlice';



const AccessibilityMenu = () => {
  // TODO: Build state machine for accessibility menu

  const [showAccessibilityMenu, setShowAccessibilityMenu] = React.useState(false);
  const dispatch = useAppDispatch();


  return (
    <div className="flex flex-col self-end items-end">
      {
        showAccessibilityMenu &&
        <div className="fixed bottom-20 right-10">
          <Card>
            <CardHeader>
              <CardTitle className="text-center"> Tabela de Acessibilidade</CardTitle>
              <CardDescription className="text-center"> Tabela para auxílio de acesso ao site </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-x-1 gap-y-1">
              <CardDescription>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Contraste</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button className="mx-1" onClick={() => {dispatch(incrementContrast())}}> <BsArrowUpCircle   size={20} /></Button>
                    <Button className="mx-1" onClick={() => {dispatch(decrementContrast())}}> <BsArrowDownCircle size={20} /></Button>
                  </CardContent>
                </Card>
              </CardDescription>
              <CardDescription>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Fonte</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button className="mx-1" onClick={() => {dispatch(incrementFontSize())}}> <BsArrowUpCircle   size={20} /></Button>
                    <Button className="mx-1" onClick={() => {dispatch(decrementFontSize())}}> <BsArrowDownCircle size={20} /></Button>
                  </CardContent>
                </Card>
              </CardDescription>
              <CardDescription>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Escala de Conteúdo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button className="mx-1" onClick={() => {dispatch(incrementContentScale())}}> <BsArrowUpCircle   size={20} /></Button>
                    <Button className="mx-1" onClick={() => {dispatch(decrementContentScale())}}> <BsArrowDownCircle   size={20} /></Button>
                  </CardContent>
                </Card>
              </CardDescription>

              <CardDescription>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Espaçamento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button className="mx-1" onClick={() => {dispatch(incrementLineSpacing())}}> <BsArrowUpCircle   size={20} /></Button>
                    <Button className="mx-1" onClick={() => {dispatch(decrementLineSpacing())}}> <BsArrowDownCircle size={20} /></Button>
                  </CardContent>
                </Card>
                </CardDescription>
                <CardDescription>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Alinhamento de Texto</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button className="mx-1" onClick={() => {dispatch(alignLeft())}}> <AiOutlineAlignLeft   size={20} /></Button>
                    <Button className="mx-1" onClick={() => {dispatch(alignCenter())}}> <AiOutlineAlignCenter size={20} /></Button>
                    <Button className="mx-1" onClick={() => {dispatch(alignRight())}}> <AiOutlineAlignRight  size={20} /></Button>
                  </CardContent>
                </Card>


              </CardDescription>

              <CardDescription>
              
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Evidenciar Links</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={() => {dispatch(toogleHighlightLink())}}> Evidenciar Links</Button>
                  </CardContent>
                </Card>
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      }
      <div>
        <Button className="fixed bottom-0 right-0 rounded-full my-5" variant="outline" onClick={() => {setShowAccessibilityMenu(!showAccessibilityMenu)}}> <BiUniversalAccess size={50} /> </Button>
      </div>
    </div>
  )
}

export default AccessibilityMenu